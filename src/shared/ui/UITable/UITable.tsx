import { Fragment, ReactNode } from 'react';
import {
  Box,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import _ from 'lodash';

import { UITableProps } from './types';
import { useTranslation } from 'react-i18next';
import { CircularProgressComponent } from '@/widgets/loader';
import { Colors } from '@/app/constants';

function UITable<T extends object>(props: UITableProps<T>) {
  const { t } = useTranslation();
  const {
    data = [],
    headers,
    columns,
    sx,
    PaginationProps,
    isLoading,
    isError,
    renderRowAfter,
  } = props;

  return (
    <Box sx={sx}>
      <TableContainer>
        <Table
          sx={{
            borderCollapse: 'separate',
          }}
        >
          <TableHead>
            {headers && (
              <TableRow
                sx={{
                  backgroundColor: '#F4F8FB',
                }}
              >
                {headers
                  .filter((el) => el !== null && typeof el !== 'undefined')
                  .map((el, idx) => (
                    <TableCell
                      key={idx}
                      align={typeof el === 'object' ? el?.align : 'left'}
                      sx={{
                        py: 1.1,
                        borderTop: `1px solid ${Colors.BORDER}`,
                        borderRight: `1px solid ${Colors.BORDER}`,
                        borderBottom: `1px solid ${Colors.BORDER}`,
                        '&:first-of-type': {
                          borderRadius: '8px 0 0 0',
                          borderLeft: `1px solid ${Colors.BORDER}`,
                        },
                        '&:last-child': {
                          borderRadius: '0 8px 0 0',
                        },
                        fontSize: '1rem',
                      }}
                    >
                      {typeof el === 'string' ? el : el?.label}
                    </TableCell>
                  ))}
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow sx={{ m: '0 auto' }}>
                <TableCell
                  colSpan={headers?.length}
                  sx={{
                    border: `1px solid ${Colors.BORDER}`,
                    borderTop: 'none',
                    borderRadius: '0 0 8px 8px',
                  }}
                >
                  <CircularProgressComponent />
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow sx={{ m: '0 auto' }}>
                <TableCell
                  colSpan={headers?.length}
                  sx={{
                    border: `1px solid ${Colors.BORDER}`,
                    borderRadius: '0 0 8px 8px',
                  }}
                >
                  <Typography
                    color='error'
                    sx={{
                      textAlign: 'center',
                      fontWeight: 500,
                    }}
                  >
                    {t('errors:fetch_data_error')}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : data?.length ? (
              data.map((row, idx) => (
                <Fragment key={idx}>
                  <TableRow
                    sx={{
                      '&:first-of-type': {
                        '& td': {
                          ...(!headers && {
                            borderTop: `1px solid ${Colors.BORDER}`,

                            '&:first-of-type': {
                              borderTopLeftRadius: '8px',
                            },

                            '&:last-child': {
                              borderTopRightRadius: '8px',
                            },
                          }),
                        },
                      },
                      '&:last-child': {
                        '& td': {
                          '&:first-of-type': {
                            borderBottomLeftRadius: '8px',
                          },
                          '&:last-child': {
                            borderBottomRightRadius: '8px',
                          },
                        },
                      },
                    }}
                  >
                    {columns.map((column, colIdx) => (
                      <TableCell
                        key={colIdx}
                        align={column.align ? column.align : 'left'}
                        sx={{
                          borderRight: `1px solid ${Colors.BORDER}`,
                          '&:first-of-type': {
                            borderLeft: `1px solid ${Colors.BORDER}`,
                          },
                          borderBottom: `1px solid ${Colors.BORDER}`,
                          py: 1.25,
                          px: 2,
                          ...(column?.nowrap && {
                            whiteSpace: 'nowrap',
                            width: '1%',
                          }),
                          fontSize: '1rem',
                          ...column?.sx,
                        }}
                      >
                        {column?.render
                          ? column?.render(row, idx)
                          : (_.get(row, column.key ? column.key : '') as ReactNode)}
                      </TableCell>
                    ))}
                  </TableRow>
                  {!!renderRowAfter && (
                    <TableRow
                      sx={{
                        '&:first-of-type': {
                          '& td': {
                            ...(!headers && {
                              borderTop: `1px solid ${Colors.BORDER}`,

                              '&:first-of-type': {
                                borderTopLeftRadius: '8px',
                              },

                              '&:last-child': {
                                borderTopRightRadius: '8px',
                              },
                            }),
                          },
                        },
                        '&:last-child': {
                          '& td': {
                            '&:first-of-type': {
                              borderBottomLeftRadius: '8px',
                            },
                            '&:last-child': {
                              borderBottomRightRadius: '8px',
                            },
                          },
                        },
                      }}
                    >
                      <TableCell
                        colSpan={columns.length}
                        sx={{
                          borderRight: `1px solid ${Colors.BORDER}`,
                          '&:first-of-type': {
                            borderLeft: `1px solid ${Colors.BORDER}`,
                          },
                          borderBottom: `1px solid ${Colors.BORDER}`,
                          py: 1.25,
                          px: 2,
                        }}
                      >
                        {renderRowAfter(row, idx)}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers ? headers.length : 1}
                  sx={{
                    borderRight: `1px solid ${Colors.BORDER}`,
                    borderLeft: `1px solid ${Colors.BORDER}`,
                    '&:last-child': {
                      borderRadius: '0 0 8px 8px',
                    },
                    borderBottom: `1px solid ${Colors.BORDER}`,
                    py: 2.5,
                    px: 2,
                    fontSize: '1rem',
                  }}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {PaginationProps && (
        <Stack
          direction='row'
          justifyContent='center'
          sx={{
            mt: 3,
          }}
        >
          <Pagination {...PaginationProps} />
        </Stack>
      )}
    </Box>
  );
}

export default UITable;
