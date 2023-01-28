import { GroupDTO } from "../controllers/group";
import { GroupModel } from "../models/group";

const result = (error: null | any, data: any) => ({ error, data });

export default class GroupService {
  async get({ id }: Pick<GroupDTO, 'id'>) {
    try {
      const user = await GroupModel.findOne({
        where: { id },
      });
      return result(null, user);
    } catch (err) {
      return result(err, null);
    }
  }
  async add(group: Omit<GroupDTO, 'id'>) {
    try {
      const newGroup = await GroupModel.create(group);
      return result(null, newGroup);
    } catch (err) {
      return result(err, null);
    }
  }
  async delete({ id }: Pick<GroupDTO, 'id'>) {
    try {
      const deleted = await GroupModel.destroy({
        where: { id }
      });
      return result(null, deleted);
    } catch (err) {
      return result(err, null);
    }
  }
  async patch({ id, name, premissions }: GroupDTO ) {
    try {
      const updated = await GroupModel.update(
        {
          name,
          premissions,
        },
        {
          where: { id },
        });
      return result(null, updated);
    } catch (err) {
      return result(err, null);
    }
  }
  async getAll() {
    try {
      const groups = await GroupModel.findAll();
      return result(null, groups);
    } catch (err) {
      return result(err, null);
    }
  }
}