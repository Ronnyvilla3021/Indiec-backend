const grupoMusicalCtl = {};
const orm = require('../Database/dataBase.orm');
const sql = require('../Database/dataBase.sql');
const mongo = require('../Database/dataBaseMongose');

// Mostrar todos los grupos musicales
grupoMusicalCtl.mostrarGrupos = async (req, res) => {
    try {
        const [listaGrupos] = await sql.promise().query('SELECT * FROM grupos_musicales WHERE estado = "activo"');
        
        const gruposCompletos = await Promise.all(
            listaGrupos.map(async (grupo) => {
                // Obtener datos adicionales de MongoDB
                const grupoMongo = await mongo.grupoMusical.findOne({ 
                    idGrupoSql: grupo.idGrupo 
                });

                return {
                    ...grupo,
                    detallesMongo: grupoMongo || null
                };
            })
        );

        return res.json(gruposCompletos);
    } catch (error) {
        console.error('Error al mostrar grupos musicales:', error);
        return res.status(500).json({ message: 'Error al obtener los grupos musicales', error: error.message });
    }
};

// Crear nuevo grupo musical
grupoMusicalCtl.crearGrupo = async (req, res) => {
    try { 
        const { nombreGrupo, generoMusical, plataforma, descripcion, imagen } = req.body;

        // Validar que los campos requeridos no estén vacíos
        if (!nombreGrupo) {
            return res.status(400).json({ message: 'El nombre del grupo es requerido' });
        }

        // Crear en SQL
        const nuevoGrupo = await orm.grupoMusical.create({
            nombreGrupo,
            estado: 'activo',
            createGrupo: new Date().toLocaleString(),
        });

        // Crear en MongoDB
        const grupoMongo = {
            generoMusical,
            plataforma,
            descripcion,
            imagen,
            idGrupoSql: nuevoGrupo.idGrupo,
            createGrupoMongo: new Date().toLocaleString(),
        };

        await mongo.grupoMusical.create(grupoMongo);

        return res.status(201).json({ 
            message: 'Grupo musical creado exitosamente',
            idGrupo: nuevoGrupo.idGrupo
        });

    } catch (error) {
        console.error('Error al crear grupo musical:', error);
        return res.status(500).json({ 
            message: 'Error al crear el grupo musical', 
            error: error.message 
        });
    }
};

// Actualizar grupo musical
grupoMusicalCtl.actualizarGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreGrupo, generoMusical, plataforma, descripcion, imagen } = req.body;

        // Validar que el nombre del grupo no esté vacío
        if (!nombreGrupo) {
            return res.status(400).json({ message: 'El nombre del grupo es requerido' });
        }

        // Actualizar en SQL
        const [result] = await sql.promise().query(`
            UPDATE grupos_musicales 
            SET nombreGrupo = ?, updateGrupo = ?
            WHERE idGrupo = ?
        `, [nombreGrupo, new Date().toLocaleString(), id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Grupo musical no encontrado' });
        }

        // Actualizar en MongoDB
        await mongo.grupoMusical.updateOne(
            { idGrupoSql: id },
            {
                $set: {
                    generoMusical,
                    plataforma,
                    descripcion,
                    imagen,
                    updateGrupoMongo: new Date().toLocaleString(),
                }
            }
        );

        return res.json({ message: 'Grupo musical actualizado exitosamente' });

    } catch (error) {
        console.error('Error al actualizar grupo musical:', error);
        return res.status(500).json({ message: 'Error al actualizar el grupo musical', error: error.message });
    }
};

// Eliminar (desactivar) grupo musical
grupoMusicalCtl.eliminarGrupo = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await sql.promise().query(`
            UPDATE grupos_musicales 
            SET estado = 'inactivo', updateGrupo = ?
            WHERE idGrupo = ?
        `, [new Date().toLocaleString(), id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Grupo musical no encontrado' });
        }

        return res.json({ message: 'Grupo musical desactivado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar grupo musical:', error);
        return res.status(500).json({ message: 'Error al desactivar el grupo musical', error: error.message });
    }
};

module.exports = grupoMusicalCtl;
