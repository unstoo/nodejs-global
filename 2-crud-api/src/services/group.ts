import { GroupDTO } from "../controllers/group";
import { Models } from "../data-access/models";

const result = (error: null | any, data: any) => ({ error, data });
const { Group } = Models;
export default class GroupService {
  async get({ id }: Pick<GroupDTO, 'id'>) {
    try {
      const user = await Group.findOne({
        where: { group_id: id },
      });
      return result(null, user);
    } catch (err) {
      return result(err, null);
    }
  }
  async add(group: Omit<GroupDTO, 'id'>) {
    try {
      const newGroup = await Group.create(group);
      return result(null, newGroup);
    } catch (err) {
      return result(err, null);
    }
  }
  async delete({ id }: Pick<GroupDTO, 'id'>) {
    try {
      const deleted = await Group.destroy({
        where: { group_id: id }
      });
      return result(null, deleted);
    } catch (err) {
      return result(err, null);
    }
  }
  async patch({ id, name, premissions }: GroupDTO ) {
    try {
      const updated = await Group.update(
        {
          name,
          premissions,
        },
        {
          where: { group_id: id },
        });
      return result(null, updated);
    } catch (err) {
      return result(err, null);
    }
  }
  async getAll() {
    try {
      const groups = await Group.findAll();
      return result(null, groups);
    } catch (err) {
      return result(err, null);
    }
  }
}