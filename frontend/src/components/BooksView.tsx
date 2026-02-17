import { useEffect, useState } from 'react';
import { Title, Stack, Table } from '@mantine/core';
import { GetBooks } from '@app';
import { app } from '@models';

export function BooksView() {
  const [books, setBooks] = useState<app.Book[]>([]);

  useEffect(() => {
    GetBooks().then(setBooks);
  }, []);

  return (
    <Stack gap="lg">
      <Title order={1}>Books</Title>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Year</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Author</Table.Th>
            <Table.Th>Publisher</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {books.map((book, i) => (
            <Table.Tr key={i}>
              <Table.Td>{book.year}</Table.Td>
              <Table.Td fw={500}>{book.title}</Table.Td>
              <Table.Td>{book.author}</Table.Td>
              <Table.Td>{book.publisher}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}
