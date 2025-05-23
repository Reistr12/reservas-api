// Importação CORRETA
const { PrismaClient } = require('@prisma/client');

// Instanciação CORRETA
const prisma = new PrismaClient();

//const types = ['soccer', 'volley']

const courtController = {
  async getAllCourts(req, res){
    try {
      const courts = await prisma.court.findMany();
      res.json(courts);
    } catch(error) {
      res.status(500).json('Error -----------------------------:' + error);
    }
  },

  async createCourt(req, res){
    try {
      let { name, type } = req.body;
      name = name.toLowerCase();
      const verifyName = await prisma.court.findFirst({
        where: { name }
      })
      if (verifyName) return res.status(400).json({ error: 'Nome de quadra cadastrado' });
     //if (!type.includes(types)) return res.status(400).json({ error: 'Type invalid' });

      const newCourt = await prisma.court.create(
        {
          data: { name, type }
        }
      );
      res.json(newCourt);
    } catch (error) {
      res.status(500).json('Error -----------------------------:' + error);
    }
  }
}

const bookingController = {
  async createBooking(req, res) {
    const { date, startTime, endTime, clientName, courtName } = req.body;
    try {
      verifyCourt = await prisma.court.findUnique({
        where: {name: courtName}
      })
      if (!verifyCourt) {
        return res.status(404).json({ error: 'Quadra não encontrada' });
      }

        // Verifica conflito de horários
      const conflictingBooking = await prisma.booking.findFirst({
        where: {
          courtName, //filtra pela mesma quadra
          date: new Date(date), // Filtra pelo mesmo dia

          // Lógica para detectar sobreposição de horários:
          OR: [
           // Condição 1: Nova reserva começa DENTRO de uma reserva existente
            {
              startTime: { lt: endTime },     // "startTime" da nova < "endTime" da existente   **lt = less than (menor que)** startTime < endtime
              endTime: { gt: startTime }      // "endTime" da nova > "startTime" da existente   **gt = greater than (maior que)** endTime > startTime
            }
          ]
        }
      });

      if (conflictingBooking) {
        return res.status(409).json({ error: 'Conflito de horário com reserva existente' });
      }

      const newBooking = await prisma.booking.create({
        data: {
          date: new Date(date),
          startTime,
          endTime,
          clientName,
          courtName
        }
      })
      res.status(201).json(newBooking);

    } catch (error) {
      res.status(500).json({ error: 'erro ao criar a reserva'})
    }
  },

  async showAllBookings(req, res) {
    try {
      const { name } = req.body;

      const court = await prisma.court.findFirst({
        where: { name: name }
      })
      if (!court) {
        return res.status(404).json({ error: 'Quadra não encontrada' });
      }

     // 2. Busca as reservas SEM incluir a quadra
    const bookings = await prisma.booking.findMany({
      where: { courtName: court.name }
    });

    // 3. Formata a resposta manualmente
    const response = {
      quadra: court.name,
      reservas: bookings.map(b => ({
        id: b.id,
        data: b.date.toISOString().split('T')[0],
        horario: `${b.startTime} - ${b.endTime}`,
        cliente: b.clientName
      }))
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar reservas' + error});
    }
}
}

module.exports = { courtController, bookingController };
//test
