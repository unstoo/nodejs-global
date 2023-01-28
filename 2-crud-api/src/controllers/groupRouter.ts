import { Router, Response } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import GroupService from '../services/group';
import {
  getGroupValidator, GetGroupSchema,
  addGroupValidator, AddGroupSchema,
  patchGroupValidator, PatchGroupSchema,
  deleteGroupValidator, DeleteGroupSchema,
  getGroupListValidator, GetGroupListSchema,
} from './group';

import { ValidatedRequest } from 'express-joi-validation';

const groupService = new GroupService();

export const groupRouter = Router();

const groupController = {
  getGroup: {
    route: '/getGroup',
    service: groupService.get
  },
  addGroup: {
    route: '/addGroup',
    service: groupService.add
  },
  patchGroup: {
    route: '/patchGroup',
    service: groupService.patch
  },
  deleteGroup: {
    route: '/deleteGroup',
    service: groupService.delete
  },
  getGroupList: {
    route: '/getGroupList',
    service: groupService.getAll,
  },
};

groupRouter.get(groupController.getGroup.route, getGroupValidator, async (req: ValidatedRequest<GetGroupSchema>, res: Response) => {
  const { data, error } = await groupController.getGroup.service(req.query);
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
  res.status(StatusCodes.OK).json(data);
});

groupRouter.post(groupController.addGroup.route, addGroupValidator, async (req: ValidatedRequest<AddGroupSchema>, res: Response
) => {
  const { data, error } = await groupController.addGroup.service(req.body);
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
  res.status(StatusCodes.OK).json(data);
});

groupRouter.patch(groupController.patchGroup.route, patchGroupValidator, async (req: ValidatedRequest<PatchGroupSchema>, res: Response) => {
  const { data, error } = await groupController.patchGroup.service(req.body);
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
  res.status(StatusCodes.OK).json(data);
});

groupRouter.delete(groupController.deleteGroup.route, deleteGroupValidator, async (req: ValidatedRequest<DeleteGroupSchema>, res: Response) => {
  const { data, error } = await groupController.deleteGroup.service(req.body);
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
  res.status(StatusCodes.OK).json(data);
});

groupRouter.get(groupController.getGroupList.route, getGroupListValidator, async (req: ValidatedRequest<GetGroupListSchema>, res: Response) => {
  const { data, error } = await groupController.getGroupList.service();
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
  res.status(StatusCodes.OK).json(data);
});
