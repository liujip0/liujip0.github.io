export default function StartScreen({conlang, conlangDispatch}) {
    return (
        <>
            <h1>Welcome to Morpheme</h1>
            <h2>Open Existing Conlang</h2>
            <input type="file" accept=".json" onChange={(event) => {
                const file = event.target.files[0]
                if (file && file.type === 'application/json') {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const content = e.target.result;
                        try {
                            conlangDispatch({
                                newValue: JSON.parse(content)
                            });
                        } catch (error) {
                            alert('Invalid file');
                        }
                    };
                    reader.readAsText(file);
                } else {
                    alert('Invalid or missing file');
                }
            }} />
            <h2>Create New Conlang</h2>
            <label>{conlang.name}</label>
        </>
    );
}