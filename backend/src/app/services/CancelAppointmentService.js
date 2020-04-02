import { isBefore, subHours } from 'date-fns';

import User from '../models/User';
import Appointment from '../models/Appointment';

import Queue from '../../lib/Queue';

import CancellationMail from '../jobs/CancellationMail';
import Cache from '../../lib/Cache';

class CancelAppointmentService {
  async run({ provider_id, user_id }) {
    // const appointment = await Appointment.findByPk(req.params.id, {
    const appointment = await Appointment.findByPk(provider_id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    // if (appointment.user_id !== req.userId) {
    if (appointment.user_id !== user_id) {
      /*
      return res.status(401).json({
        error: "You don't have permission to cancel this appointment.",
      });
      */
      throw new Error("You don't have permission to cancel this appointment");
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      /*
      return res.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance.',
      });
      */
      throw new Error('You can only cancel appointments 2 hours in advance');
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    /*
    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      // text: 'Você tem um novo cancelamento',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(appointment.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
    */

    await Queue.add(CancellationMail.key, {
      appointment,
      // teste: 'teste',
    });

    /**
     * Invalidate Cache
     */
    await Cache.invalidatePrefix(`user:${user_id}:appointments`);

    return appointment;
  }
}

export default new CancelAppointmentService();
