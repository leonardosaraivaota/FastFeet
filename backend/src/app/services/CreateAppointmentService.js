import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/User';
import Appointment from '../models/Appointment';

import Notification from '../schemas/Notification';

import Cache from '../../lib/Cache';

class CreateAppointmentService {
  async run({ provider_id, user_id, date }) {
    /**
     * Check if provider_id is a provider
     */
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      /*
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
      */
      throw new Error('You can only create appointments with providers');
    }

    /**
     * Check for past dates
     */

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      // return res.status(400).json({ error: 'Past dates are not permitted' });
      throw new Error('Past dates are not permitted');
    }

    /**
     * Check date availability
     */

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      /*
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
      */
      throw new Error('Appointment date is not available');
    }

    const appointment = await Appointment.create({
      // user_id: req.userId,
      user_id,
      provider_id,
      date: hourStart,
    });

    /**
     * Notify appointment provider
     */
    // const user = await User.findByPk(req.userId);
    const user = await User.findByPk(user_id);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para o ${formattedDate}, às 08:40`,
      user: provider_id,
    });

    /**
     * Invalidate Cache
     */
    await Cache.invalidatePrefix(`user:${user.id}:appointments`);

    return appointment;
  }
}

export default new CreateAppointmentService();
