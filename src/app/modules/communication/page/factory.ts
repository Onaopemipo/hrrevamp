// factories/user.ts
import { Factory } from 'fishery';
import * as fakerStatic from 'faker';
import { random } from 'faker';
import { IEmail } from './models';


export default Factory.define<IEmail>(({ sequence }) => ({
    subject: fakerStatic.random.words(10),
    recipient: fakerStatic.name.firstName(),
    cc_recipient: fakerStatic.name.firstName(),
    status_id: 1,
    id: 1,
    date_sent: fakerStatic.date.past(),
}));

// console.log(IEmailFactory)
// export default {
//     IEmailFactory,
// };
