import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

class DeliveryPicker extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    /*
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    */
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });

    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });

    this.belongsTo(models.Delivery, {
      foreignKey: 'delivery_id',
      as: 'delivery',
    });
  }

  /*
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
  */
}

export default DeliveryPicker;
