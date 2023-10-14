import { FieldValues } from 'react-hook-form';
import { UIDetailsTableProps } from './types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import _ from 'lodash';
import { Colors } from '@/app/constants';

function UIDetailsTable<T extends FieldValues>(props: UIDetailsTableProps<T>) {
  const { data, rows, headers, sx, cellSx } = props;
  return (
    <TableContainer sx={sx}>
      <Table
        sx={{
          borderCollapse: 'separate',
        }}
      >
        {headers && (
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#F4F8FB',
              }}
            >
              {headers.map((el, idx) => (
                <TableCell
                  key={idx}
                  colSpan={el.colSpan}
                  sx={{
                    py: 1.1,
                    borderTop: `1px solid ${Colors.BORDER}`,
                    borderRight: `1px solid ${Colors.BORDER}`,
                    ...(el?.nowrap && {
                      whiteSpace: 'nowrap',
                      width: '1%',
                    }),
                    '&:first-of-type': {
                      borderRadius: '8px 0 0 0',
                      borderLeft: `1px solid ${Colors.BORDER}`,
                    },
                    '&:last-child': {
                      borderRadius: '0 8px 0 0',
                    },
                    fontWeight: 600,
                    fontSize: '1.26rem',
                  }}
                >
                  {el.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{
                ...(!headers?.length && {
                  '&:first-of-type': {
                    '& td': {
                      borderTop: `1px solid ${Colors.BORDER}`,
                      '&:first-of-type': {
                        borderTopLeftRadius: '8px',
                      },
                      '&:last-child': {
                        borderTopRightRadius: '8px',
                      },
                    },
                  },
                }),
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
              {row.map((el, colIdx) => {
                const sx = {
                  ...el.sx,
                  ...cellSx,
                };
                return (
                  <TableCell
                    key={colIdx}
                    colSpan={el.colSpan}
                    rowSpan={el.rowSpan}
                    sx={{
                      borderRight: `1px solid ${Colors.BORDER}`,
                      '&:first-of-type': {
                        borderLeft: `1px solid ${Colors.BORDER}`,
                      },
                      borderBottom: `1px solid ${Colors.BORDER}`,
                      py: 1.25,
                      px: 2,
                      ...(el?.nowrap && {
                        whiteSpace: 'nowrap',
                        width: '1%',
                      }),
                      fontSize: '1rem',
                      fontWeight: colIdx === 0 ? 600 : 400,
                      ...sx,
                    }}
                  >
                    {el?.key ? _.get(data, el.key) : el?.render?.(data)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UIDetailsTable;
