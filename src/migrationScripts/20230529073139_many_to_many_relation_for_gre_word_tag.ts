// NODE_PATH=src ts-node src/migrationScripts/20230529073139_many_to_many_relation_for_gre_word_tag.ts
import { db } from 'db';
const data = {
  greWords: [
    { id: '9317922a-1205-4db9-a652-a2c8d6f8f8fd' },
    { id: 'cd1f6005-ffe2-4d68-8bcc-d847be31d335' },
    { id: 'dcfd0b08-eec9-40ce-9d13-8cca556284fa' },
    { id: '7e66d8d6-718d-4883-8da9-b8fe70d57d2d' },
    { id: '3719e932-d6be-4927-b017-4439bc1e425e' },
    { id: '7d37f9eb-be98-4acc-b1b1-1cc2b61f86a3' },
    { id: '9c813f99-4fd1-453f-926b-f3f2ae62d81a' },
    { id: '0c7be813-2893-45a3-ad85-37fde5b0ba9b' },
    { id: '982f4744-ee37-42bb-aa75-baa5cb9890e1' },
    { id: '38e16e0d-0f8c-4a3c-aa21-6d305aeaed1d' },
    { id: 'e0da01a3-14d4-44b0-83c7-bbd210baf292' },
    { id: '22761a45-b346-4c4b-b288-6aecb4706c69' },
    { id: '31f46200-3d29-471b-9f66-72c89dd87383' },
    { id: '05771c69-8d46-43ae-a1bc-34f533ab4b28' },
    { id: 'f6520ab0-e20e-439e-8419-1bab8cb02722' },
    { id: 'fcc1a0a7-2bd0-4788-9a84-a08cdb68c2e7' },
    { id: '175d210e-d375-48b6-8911-6dc18bf6cd7b' },
    { id: 'd4d6e05e-ea17-413e-93a9-d5cd29ceed1b' },
    { id: 'de2f9bda-0328-4e1e-a666-9b184df5e9e0' },
    { id: '8d7f881e-1bdc-4f04-a9bd-15afd0bc2076' },
    { id: '5e635df8-2860-4ab8-aba1-66079f245545' },
    { id: '3be8acf4-4ca7-4523-bcb5-18849baaf07f' },
    { id: '7f564f55-f4b5-4626-9ae2-4bb14d0403f5' },
    { id: '43ae7584-9c71-4ee0-903b-54691dae1177' },
    { id: '73cd0b05-ab19-482e-bdb8-90578eaab0b2' },
    { id: 'f0ea2004-8024-49d7-8ca4-e10dea714451' },
    { id: '808477c3-ce83-41d3-893b-042be16bdbcc' },
    { id: '3acc65e9-da6c-4142-85f9-de6dce3e2a5a' },
    { id: '3eeae7ae-8919-4eec-a9e8-583b61fe771b' },
    { id: '0cd50112-fcb7-4725-8e35-7e873cdff89e' },
    { id: '763ad877-a559-46e6-aa92-3f5ada3de67d' },
    { id: 'e414353b-6b36-425e-8979-06e21d85f951' },
    { id: '01b12e35-0111-48fc-b05e-75473669c1ab' },
  ],
};

const fn = async () => {
  for (let entry of data.greWords) {
    const { id } = entry;
    const updatedGreWord = await db.greWord.update({
      where: {
        id: id,
      },
      data: {
        greWordTags: {
          set: {
            name_userId: {
              name: 'Advanced Level 3',
              userId: 'd710d741-afa1-4ab5-9a3f-8132bb2e63c5',
            },
          },
        },
      },
    });
    console.log(updatedGreWord);
  }
};

fn();
