import LoadingSpinner from "../LoadingSpinner";
import React from "react";

// import Logo from '../../assets/logo/EBControlLogo.svg';

// import styles from './FullscreenLoader.module.scss';

interface IFullscreenLoaderProps {
  withLogo?: boolean | undefined;
}

export default function FullscreenLoader({ withLogo }: IFullscreenLoaderProps) {
  return (
    <div className="h-100 flex-grow-1 d-flex flex-column justify-content-center align-items-center mt-5">
      <LoadingSpinner />
    </div>
  );
}
