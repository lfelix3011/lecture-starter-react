import { Header } from "../header/header";
import { Footer } from "../footer/footer";

type Props = {
  children: React.ReactNode;
  isAuthenticated: boolean;
};

const Layout = ({ children, isAuthenticated }: Props): JSX.Element => {
  return (
    <>
      <Header isAuthenticated={isAuthenticated}></Header>
      {children}
      <Footer></Footer>
    </>
  );
};

export { Layout };
