import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, chakra, IconButton, TableCaption, HStack, Input, Select, Stack, InputGroup, InputLeftElement, Tfoot, Box } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, Search2Icon } from '@chakra-ui/icons';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import { FiChevronLeft, FiChevronRight, FiFilter } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';

export const TableComponent = ({ columns, data }) => {

    const isMobile = useMediaQuery({ maxWidth: 768 });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        prepareRow,
        setGlobalFilter,
        setPageSize,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 3 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    );

    const { pageIndex, globalFilter, pageSize } = state;

    const handlePageSizeChange = (e) => {
        const newSize = Number(e.target.value);
        setPageSize(newSize);
    };

    return (
        <Box overflowX="auto">
            <Stack
                spacing={4}
                direction="row"
                justifyContent="space-between"
                py={2}
            >
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        boxSize={12}
                    >
                        <Search2Icon
                            color='purple.500'
                            boxSize={5}
                        />
                    </InputLeftElement>
                    <Input
                        placeholder="Buscar Pagos"
                        value={globalFilter || ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        size="lg"
                        fontSize={'md'}
                        variant="outline"
                        rounded={'xl'}
                        _focus={{
                            borderColor: 'purple.500',
                            boxShadow: 'none',
                        }}
                    />
                </InputGroup>

                <IconButton
                    icon={<FiFilter />}
                    variant={'ghost'}
                    rounded={'full'}
                    size={'lg'}
                    colorScheme="gray"
                />
            </Stack>
            <Table variant="simple" size={isMobile ? 'sm' : 'md'} {...getTableProps()}>
                <TableCaption>
                    <HStack spacing={4} justifyContent={'flex-end'}>
                        <span>
                            Mostrando{' '}
                            <strong>
                                {pageIndex * pageSize + 1} - {pageIndex * pageSize + page.length}
                            </strong>{' '}
                            de <strong>{data.length}</strong> resultados
                        </span>
                        <Select
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            width="auto"
                            fontWeight="bold"
                            _focus={{
                                boxShadow: 'none',
                            }}
                        >
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="50">50</option>
                        </Select>
                        <IconButton
                            icon={<FiChevronLeft />}
                            variant={'ghost'}
                            rounded={'full'}
                            colorScheme="gray"
                            onClick={() => previousPage()}
                            isDisabled={!canPreviousPage}
                        />
                        <IconButton
                            icon={<FiChevronRight />}
                            colorScheme="gray"
                            variant={'ghost'}
                            rounded={'full'}
                            onClick={() => nextPage()}
                            isDisabled={!canNextPage}
                        />
                        <span>
                            Página{' '}
                            <strong>
                                {pageIndex + 1} de {pageOptions.length}
                            </strong>
                        </span>
                    </HStack>
                </TableCaption>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th {...column.getHeaderProps(column.getSortByToggleProps())} fontSize={'15px'} color="black" _dark={{ color: 'white' }}>
                                    {column.render('Header')}
                                    <chakra.span pl="2">
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <ChevronDownIcon fontSize={20} aria-label="sorted descending" />
                                            ) : (
                                                <ChevronUpIcon fontSize={20} aria-label="sorted ascending" />
                                            )
                                        ) : null}
                                    </chakra.span>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <Td {...cell.getCellProps()} fontSize={'14px'}>{cell.render('Cell')}</Td>
                                ))}
                            </Tr>
                        );
                    })}
                </Tbody>
                <Tfoot>

                </Tfoot> 
            </Table>
        </Box>
    );
};