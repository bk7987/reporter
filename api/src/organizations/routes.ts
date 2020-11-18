import express from 'express';
import { Organization, OrganizationCreate } from './models';
import { validateBody } from '../middleware/validate';
import { addOrganizationClaim } from '../auth';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send({ message: 'test' });
});

router.post('/', validateBody(OrganizationCreate), async (req, res) => {
  const organization = Organization.create({
    ...(req.body as OrganizationCreate),
    ownerId: req.userId,
  });
  await organization.save();
  await addOrganizationClaim(req.userId, organization.id);
  res.sendStatus(201);
});

export { router as organizationsRouter };
