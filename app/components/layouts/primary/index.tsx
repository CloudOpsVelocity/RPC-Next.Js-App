import Footer from "./footer";
import Header from "./header";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full">
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
