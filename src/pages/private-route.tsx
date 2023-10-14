import { useAppSelector } from '@/app/hooks';
import { CabinetType } from '@/entities/app/model/types';
import { UserType } from '@/entities/session/model/types';
import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

interface Props extends PropsWithChildren {
  cabinetTypeCheck?: CabinetType;
  checkIsLogged?: boolean;
  userTypeCheck?: UserType;
}

export const PrivateRoute: React.FC<Props> = ({
  children,
  cabinetTypeCheck,
  checkIsLogged = true,
  userTypeCheck,
}) => {
  const { isLogged, userType } = useAppSelector((state) => state.session);
  const { cabinetType } = useAppSelector((state) => state.app);

  const check = () => {
    if (checkIsLogged && !isLogged) {
      return <Navigate to='/login' replace />;
    }

    if (cabinetTypeCheck && cabinetType !== cabinetTypeCheck) {
      return <Navigate to='/study' replace />;
    }

    if (userTypeCheck && userTypeCheck !== userType) {
      return <Navigate to='/study' replace />;
    }

    return children;
  };

  return check();
};
