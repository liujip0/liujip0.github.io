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

type AlertProps = {
    title: string;
    description: string;
    onAccept?: () => void;
    onDecline?: () => void;
};
export function Alert({ title, description, onAccept, onDecline }: AlertProps) {
    return (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'lightgray',
                border: '1px solid darkgray',
                padding: '1em',
                zIndex: '99'
            }}>
            <h1
                style={{
                    textAlign: 'left',
                    margin: '0',
                    fontSize: '1.6em'
                }}>
                {title}
            </h1>
            <p
                style={{
                    fontWeight: 'normal',
                    textAlign: 'left'
                }}>
                {description}
            </p>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                <button onClick={onDecline}>Go Back</button>&nbsp;
                <button onClick={onAccept}>Continue</button>
            </div>
        </div>
    );
}
