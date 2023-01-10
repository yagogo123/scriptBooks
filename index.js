const Excel = require('exceljs');
const knex = require('./database/knexFile')


const readFile = async () => {
  const publish = 1;
  const unpublish = 2;
  const workbook = new Excel.Workbook();
  const result = await workbook.xlsx.readFile('./Books_2023.xlsx');

  const publishWorkSheet = result.getWorksheet('Publicar');

  const unpublishWorkSheet = result.getWorksheet('Despublicar');

  const publishBookIds = getBooksIds(publishWorkSheet)
  await publishOrUnpublishBooks(publishBookIds, publish)

  const unpublishBookIds = getBooksIds(unpublishWorkSheet)
  await publishOrUnpublishBooks(unpublishBookIds, unpublish)
  
  return
}

const publishOrUnpublishBooks = async (bookIds, bookStatusId) => {
  const db = await knex.connect();
  await db('books')
    .whereIn('id', bookIds)
    .update({
      book_status_id: bookStatusId
    })

  await db.destroy()

}

const getBooksIds = (worksheet) => {
  let bookIds = []
  for (let i = 0; i <= worksheet.rowCount; i++){
    const rowValues = worksheet.getRow(i).values;
    if (rowValues.length) {
      if (typeof rowValues[4] === 'object'){
        const bookId = rowValues[4].text.split('edit/')[1];
        bookIds.push(bookId)

      }
    }
  }

  return bookIds
}

readFile();