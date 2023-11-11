import { ReactNode, useEffect } from "react";
import { NextSeo } from "next-seo";
import { useAppDispatch } from "@core/hooks/redux";
import { refresh } from "@modules/auth/reducer/actions";

interface IProps {
  children?: ReactNode;
  title?: string;
}

const Layout = ({ children, title }: IProps): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(refresh());
  }, []);

  return (
    <>
      <NextSeo title={title} />
      {children}
    </>
  );
};

export default Layout;
