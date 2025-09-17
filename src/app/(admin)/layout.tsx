"use client";

import Sidebar from "@/components/common/sidebar";
import AdminProfile from "@/components/profile/adminProfile";
import { AuthContext } from "@/contexts/AuthContext";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
    const { accessToken, user } = useContext(AuthContext) ?? {};
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!accessToken) return;
        if (!user) return;
        if (user.Role !== "Admin") {
            router.push('/');
        }
    }, [accessToken, user, router])

    return (
        <Layout className="!min-h-screen">
            <Sider
                className="pt-20"
                trigger={null}
                collapsible collapsed={collapsed}>
                <Sidebar />
            </Sider>
            <Layout>
                <Header
                    className="border-b flex justify-between border-gray-200 shadow-sm"
                    style={{
                        padding: 0,
                        background: "transparent",
                    }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    {
                        accessToken ? <AdminProfile /> : <></>
                    }
                </Header>
                <Content >
                    <main className="p-4">{children}</main>
                </Content>
                <Footer >
                    <div className="text-center text-xs">&copy; 2025 Justik Tran. All rights reserved. </div>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default PageLayout;