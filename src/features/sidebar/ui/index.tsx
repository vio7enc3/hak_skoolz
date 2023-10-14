import { Box, Stack } from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import { SidebarNav } from './sidebar-nav';
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_EXPANDED_WIDTH } from '@/app/constants';

export const Sidebar = () => {
  const { sidebarCollapsed } = useAppSelector((state) => state.app);

  return (
    <Stack
      sx={{
        width: sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH,
        maxHeight: '100%',
        minHeight: '100%',
        position: 'fixed',
        zIndex: 1000,
        overflowY: sidebarCollapsed ? 'unset' : 'auto',
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Box
          sx={{
            mt: 2,
          }}
        >
          <SidebarNav
            sx={{
              mt: sidebarCollapsed ? 2 : 0,
            }}
          />
        </Box>
      </Box>

      {/* {!sidebarCollapsed && userType !== 'person' && <SidebarBanalce />} */}
    </Stack>
  );
};
