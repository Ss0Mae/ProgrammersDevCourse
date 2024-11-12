import { styled } from "styled-components";
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
            <LayoutStyle>{children}</LayoutStyle>
            <Footer/>
        </>
    )
}

const LayoutStyle = styled.main`
    width : 100%;
    margin : 0 auto;
    max-width : ${({ theme }) => theme.layout.width.large};
    padding : 20px 0;
`;
export default Layout;