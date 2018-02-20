
const categories = deps => ({
  all: () => new Promise((resolve, reject) => {
    const { connection, errorHandler } = deps;
    connection.query('SELECT * FROM categories', (error, results) => {
      if (error) {
        errorHandler(error, 'Falha ao exibir as categorias', reject);
        return false;
      }
      resolve({ categories: results });
    });
  }),

  save: name => new Promise((resolve, reject) => {
    const { connection, errorHandler } = deps;
    connection.query('INSERT INTO categories (name) VALUES (?)', [name], (error, results) => {
      if (error) {
        errorHandler(error, `Falha ao salvar a categoria ${name}`, reject);
        return false;
      }
      resolve({ category: { name, id: results.insertId } });
    });
  }),

  update: (id, name) => new Promise((resolve, reject) => {
    const { connection, errorHandler } = deps;
    connection.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (error, results) => {
      if (error || !results.affectedRows) {
        errorHandler(error, `Falha ao atualizar a categoria ${name}`, reject);
        return false;
      }
      resolve({ category: { name, id }, message: 'Categoria atualizada com sucesso', affectedRows: results.affectedRows });
    });
  }),

  del: id => new Promise((resolve, reject) => {
    const { connection, errorHandler } = deps;
    connection.query('DELETE FROM categories WHERE id = ?', [id], (error, results) => {
      if (error || !results.affectedRows) {
        errorHandler(error, 'Falha ao remover a categoria', reject);
        return false;
      }
      resolve({ message: 'Categoria removida com sucesso', affectedRows: results.affectedRows });
    });
  }),
});

module.exports = categories;
