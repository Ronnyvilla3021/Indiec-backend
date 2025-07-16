const orm = require('../Database/dataBase.orm');
const sql = require('../Database/dataBase.sql');
const relacionesCtl = {};

// Asignar artista a evento
relacionesCtl.asignarArtistaEvento = async (req, res) => {
    try {
        const { artistaId, eventoId } = req.body;

        // Verificar que ambos existan
        const artista = await orm.artista.findByPk(artistaId);
        const evento = await orm.evento.findByPk(eventoId);

        if (!artista || !evento) {
            return res.apiError('Artista o evento no encontrado', 404);
        }

        // Crear la relación
        await artista.addEvento(evento);

        return res.apiResponse(null, 200, 'Artista asignado al evento exitosamente');
    } catch (error) {
        console.error('Error al asignar artista a evento:', error);
        return res.apiError('Error al asignar artista al evento', 500);
    }
};

// Obtener artistas de un evento
relacionesCtl.obtenerArtistasEvento = async (req, res) => {
    try {
        const { eventoId } = req.params;

        const evento = await orm.evento.findByPk(eventoId, {
            include: [{
                model: orm.artista,
                through: { attributes: [] } // No incluir campos de la tabla intermedia
            }]
        });

        if (!evento) {
            return res.apiError('Evento no encontrado', 404);
        }

        return res.apiResponse(evento, 200, 'Artistas del evento obtenidos');
    } catch (error) {
        console.error('Error al obtener artistas del evento:', error);
        return res.apiError('Error interno del servidor', 500);
    }
};

// Asignar artista a grupo musical
relacionesCtl.asignarArtistaGrupo = async (req, res) => {
    try {
        const { artistaId, grupoId } = req.body;

        const artista = await orm.artista.findByPk(artistaId);
        const grupo = await orm.grupoMusical.findByPk(grupoId);

        if (!artista || !grupo) {
            return res.apiError('Artista o grupo no encontrado', 404);
        }

        await artista.addGrupoMusical(grupo);

        return res.apiResponse(null, 200, 'Artista asignado al grupo exitosamente');
    } catch (error) {
        console.error('Error al asignar artista a grupo:', error);
        return res.apiError('Error al asignar artista al grupo', 500);
    }
};

// Obtener miembros de un grupo
relacionesCtl.obtenerMiembrosGrupo = async (req, res) => {
    try {
        const { grupoId } = req.params;

        const grupo = await orm.grupoMusical.findByPk(grupoId, {
            include: [{
                model: orm.artista,
                through: { attributes: [] }
            }]
        });

        if (!grupo) {
            return res.apiError('Grupo no encontrado', 404);
        }

        return res.apiResponse(grupo, 200, 'Miembros del grupo obtenidos');
    } catch (error) {
        console.error('Error al obtener miembros del grupo:', error);
        return res.apiError('Error interno del servidor', 500);
    }
};

module.exports = relacionesCtl;