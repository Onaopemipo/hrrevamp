// factories/user.ts
import { Factory } from 'fishery';
import * as fakerStatic from 'faker';
import { IComplaint } from '../../main/models';
import { random } from 'faker';

export default Factory.define<IComplaint>(({ sequence }) => ({
  id: sequence,
  complainerEmail: fakerStatic.name.firstName() + '@gmail.com',
  complainerName: fakerStatic.name.firstName() + ' ' + fakerStatic.name.lastName(),
  title: fakerStatic.lorem.sentence(10),
  description: fakerStatic.lorem.sentences(),
  referenceNo: String(fakerStatic.random.number()),
  status: String(random.number(3)),
  time: fakerStatic.date.recent(),

}));
