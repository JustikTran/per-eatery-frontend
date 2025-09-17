"use client";

const PageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="min-h-screen">
            <main>{children}</main>
        </div>
    );
};

export default PageLayout;