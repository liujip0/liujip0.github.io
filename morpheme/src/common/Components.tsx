type NavBarProps = {
    sections: Array<{
        label: string;
        id: string;
    }>;
};
export function NavBar({ sections }: NavBarProps) {
    return (
        <div
            style={{
                position: 'sticky',
                top: '0',
                display: 'flex',
                backgroundColor: 'white'
            }}>
            {sections.map((x) => {
                return (
                    <button
                        key={x.id}
                        style={{
                            margin: '0.2em'
                        }}
                        onClick={() => {
                            const element = document.getElementById(x.id)!;
                            element.scrollIntoView({
                                block: 'center',
                                inline: 'nearest',
                                behavior: 'smooth'
                            });
                        }}>
                        {x.label}
                    </button>
                );
            })}
        </div>
    );
}

type NavSectionProps = {
    id: string;
    children: React.ReactNode;
};
export function NavSection({ id, children }: NavSectionProps) {
    return (
        <h1
            style={{
                marginTop: '1em'
            }}
            id={id}>
            {children}
        </h1>
    );
}
