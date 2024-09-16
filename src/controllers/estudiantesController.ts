import { Request, Response } from "express";
import { AppDataSource } from '../db/conexion';
import { Estudiante } from '../models/estudiantesModel';
import { Repository } from "typeorm";


class EstudiantesController {
    private estudiante: Repository<Estudiante>;

    constructor() {

        this.estudiante = AppDataSource.getRepository(Estudiante);

    }

    async consultar(req: Request, res: Response) {
        try {
            const data = await this.estudiante.find();
            res.status(200).json(data);

        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }

    async consultarDetalle(req: Request, res: Response) {
        const { id } = req.params;
        try {

            const registro = await this.estudiante.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            }
            res.status(200).json(registro)

        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }

    }

    async ingresar(req: Request, res: Response) {
        try {

            const registro = await this.estudiante.save(req.body);
            res.status(201).json(registro);

        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }

    }

    async actualizar(req: Request, res: Response) {

        const { id } = req.params;

        try {

            const registro = await this.estudiante.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            } else {
                await this.estudiante.update({ id: Number(id) }, req.body);
                const registroActualizado = await this.estudiante.findOneBy({ id: Number(id) });
                res.send(200).json(registroActualizado);
            }

        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }

    }

    async borrar(req: Request, res: Response) {
        const { id } = req.params;

        try {

            const registro = await this.estudiante.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            } else {
                await this.estudiante.update({ id: Number(id) }, req.body);
                res.send(204);
            }

        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }


}

export default new EstudiantesController();