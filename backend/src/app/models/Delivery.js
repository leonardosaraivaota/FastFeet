import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        statusDelivery: Sequelize.VIRTUAL,
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.start_date === null) {
              this.statusDelivery = 'PENDENTE';
            }
            if (this.start_date !== null && this.end_date === null) {
              this.statusDelivery = 'RETIRADA';
            }
            if (this.canceled_at !== null) {
              this.statusDelivery = 'CANCELADA';
            }
            if (this.signature_id !== null) {
              this.statusDelivery = 'ENTREGUE';
            }
            return this.statusDelivery;
          },
        },
      },
      {
        sequelize,
      }
    );
    /*
    this.addHook('beforeSave', async delivery => {
      delivery.start_date = new Date();
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

    this.belongsTo(models.Signature, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }

  /*
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
  */
}

export default Delivery;
