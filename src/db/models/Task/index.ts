import { Model } from 'sequelize';

export class Task extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public status!: string;
  public authId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
