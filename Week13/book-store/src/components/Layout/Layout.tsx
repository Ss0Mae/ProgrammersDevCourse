import Footer from "../common/Footer";
import Header from "../common/Header";

interface LayoutProps {
    children: React.ReactNode;
}
//React Node는 리액트로 만들수 있는 모든 컴포넌트를 포함한다.
function Layout({ children }: LayoutProps) {
    return(
        <>
            <Header />
            <main>{children}</main>
            <Footer/>
        </>
    )
}
export default Layout;