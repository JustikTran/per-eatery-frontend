"use client";

import CpnHeader from "@/components/common/header";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

const PageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <Layout className="!min-h-screen ">
            <Header
                className="border-b shadow-lg"
                style={{
                    backgroundColor: 'white',
                    paddingLeft: 40,
                    paddingRight: 40,
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                }}>
                <CpnHeader />
            </Header>
            <Content style={{ backgroundColor: 'transparent', paddingLeft: 40, paddingRight: 40 }}>
                <main>{children}</main>
            </Content>
            <Footer style={{ backgroundColor: 'white' }}>
                <p className="text-center text-xs">&copy; 2025 Justik Tran. All rights reserved. </p>
            </Footer>
        </Layout>
    );
};

export default PageLayout;