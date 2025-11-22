document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('json-input');
    const validateFormatBtn = document.getElementById('validate-format');
    const copyBtn = document.getElementById('copy');
    const clearBtn = document.getElementById('clear');
    const statusMessage = document.getElementById('status-message');

    validateFormatBtn.addEventListener('click', () => {
        const text = jsonInput.value.trim();
        if (!text) {
            setStatus('Error: Textarea is empty.', 'error');
            return;
        }

        try {
            const data = JSON.parse(text);
            const formatted = JSON.stringify(data, null, 2);
            jsonInput.value = formatted;
            setStatus('Success: Valid JSON & Formatted!', 'success');
        } catch (error) {
            setStatus(`Error: Invalid JSON. (Details: ${error.message})`, 'error');
        }
    });

    copyBtn.addEventListener('click', () => {
        if (!jsonInput.value) {
            setStatus('Nothing to copy.', 'error');
            return;
        }
        navigator.clipboard.writeText(jsonInput.value)
            .then(() => {
                setStatus('Copied to clipboard!', 'success');
            })
            .catch(err => {
                setStatus('Failed to copy.', 'error');
            });
    });

    clearBtn.addEventListener('click', () => {
        jsonInput.value = '';
        statusMessage.innerHTML = '';
        statusMessage.className = '';
    });

    function setStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = type; // 'success' or 'error'
    }
});
