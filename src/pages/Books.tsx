import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CirclePlus, MoreHorizontal } from 'lucide-react';
import React, { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteBook, getAllBooks } from '@/http/api';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
export interface Book {
  _id: string;
  title: string;
  description: string;
  author: string;
  coverImage: string;
  file: string;
  updatedAt: string;
  createdAt: string;
  genre: string;
}
function Books() {
  const { data } = useQuery({
    queryKey: ['books'],
    queryFn: getAllBooks,
    staleTime: 10000,
  });

  //console.log(data?.data?.bookRes);
  const books = data?.data?.bookRes;
  //console.log(books);

  // dialog alert
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => setIsOpen(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: (res) => {
      console.log(res);

      if (res.status === 204) {
        queryClient.invalidateQueries({ queryKey: ['books'] });
        console.log('bookDeleted SuccessFully');
      }
    },
    onError: (error, context) => {
      console.log(error, ' ', context);
    },
  });

  const handleDelete = (bookId: string) => {
    if (!bookId) {
      return console.log('id required');
    }
    //console.log(bookId);

    mutation.mutate(bookId);
  };
  return (
    <div>
      <div className="flex justify-between p-2">
        <Breadcrumb className="">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Books</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link to={'/dashboard/add-book'}>
          <Button>
            <CirclePlus className="mr-1" />
            Add Book
          </Button>
        </Link>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>

                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Description
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books &&
                books.map((book: Book) => (
                  <TableRow key={book._id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={`${book.coverImage}`}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{book.genre}</Badge>
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      {book.createdAt}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{book.description}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                              <AlertDialogTrigger asChild>
                                <span onClick={() => setIsOpen(true)}>
                                  Delete
                                </span>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your book from server.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={closeDialog}>
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      handleDelete(book._id);
                                      closeDialog();
                                    }}
                                  >
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1</strong> of todo need
            <strong>{books?.length}</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Books;
