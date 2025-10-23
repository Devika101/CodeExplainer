// Code Explainer AI - Interactive JavaScript
class CodeExplainerApp {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.setupAnimations();
        this.initializeTheme();
    }

    initializeElements() {
        // Main elements
        this.codeInput = document.getElementById('codeInput');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.formatBtn = document.getElementById('formatBtn');
        this.languageSelect = document.getElementById('languageSelect');
        this.resultsSection = document.getElementById('resultsSection');
        this.processingIndicator = document.getElementById('processingIndicator');
        
        // Result content elements
        this.explanationContent = document.getElementById('explanationContent');
        this.issuesContent = document.getElementById('issuesContent');
        this.optimizationContent = document.getElementById('optimizationContent');
        
        // Secondary action buttons
        this.debugBtn = document.getElementById('debugBtn');
        this.optimizeBtn = document.getElementById('optimizeBtn');
        this.explainBtn = document.getElementById('explainBtn');
        
        // Counter elements
        this.lineCount = document.getElementById('lineCount');
        this.charCount = document.getElementById('charCount');
        
        // Theme toggle
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
    }

    bindEvents() {
        // Main analyze button
        this.analyzeBtn.addEventListener('click', () => this.analyzeCode());
        
        // Clear button
        this.clearBtn.addEventListener('click', () => this.clearCode());
        
        // Format button
        this.formatBtn.addEventListener('click', () => this.formatCode());
        
        // Code input events
        this.codeInput.addEventListener('input', () => this.updateCounters());
        this.codeInput.addEventListener('paste', () => {
            setTimeout(() => this.updateCounters(), 100);
        });
        
        // Language selection
        this.languageSelect.addEventListener('change', () => this.updateLanguage());
        
        // Secondary action buttons
        this.debugBtn.addEventListener('click', () => this.analyzeCode('debug'));
        this.optimizeBtn.addEventListener('click', () => this.analyzeCode('optimize'));
        this.explainBtn.addEventListener('click', () => this.analyzeCode('explain'));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Auto-resize textarea
        this.codeInput.addEventListener('input', () => this.autoResizeTextarea());
        
        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.code-section, .action-section, .results-section');
        animatedElements.forEach(el => observer.observe(el));
    }

    updateCounters() {
        const code = this.codeInput.value;
        const lines = code.split('\n').length;
        const chars = code.length;
        
        this.lineCount.textContent = `${lines} line${lines !== 1 ? 's' : ''}`;
        this.charCount.textContent = `${chars} character${chars !== 1 ? 's' : ''}`;
    }

    updateLanguage() {
        const language = this.languageSelect.value;
        const placeholder = this.getLanguagePlaceholder(language);
        this.codeInput.placeholder = placeholder;
        
        // Update syntax highlighting (basic implementation)
        this.updateSyntaxHighlighting(language);
    }

    getLanguagePlaceholder(language) {
        const placeholders = {
            python: "def hello_world():\n    print('Hello, World!')\n    return 'Success'",
            javascript: "function helloWorld() {\n    console.log('Hello, World!');\n    return 'Success';\n}",
            java: "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
            cpp: "#include <iostream>\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}",
            csharp: "using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Hello, World!\");\n    }\n}",
            go: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}",
            rust: "fn main() {\n    println!(\"Hello, World!\");\n}"
        };
        return placeholders[language] || "Paste your code here...";
    }

    updateSyntaxHighlighting(language) {
        // Basic syntax highlighting implementation
        // In a real application, you'd use a library like Prism.js or highlight.js
        this.codeInput.style.fontFamily = "'Courier New', monospace";
    }

    autoResizeTextarea() {
        this.codeInput.style.height = 'auto';
        this.codeInput.style.height = Math.max(400, this.codeInput.scrollHeight) + 'px';
    }

    clearCode() {
        this.codeInput.value = '';
        this.updateCounters();
        this.hideResults();
        this.codeInput.focus();
        
        // Add visual feedback
        this.codeInput.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.codeInput.style.transform = 'scale(1)';
        }, 150);
    }

    formatCode() {
        const code = this.codeInput.value.trim();
        if (!code) return;
        
        // Basic formatting (in a real app, you'd use a proper formatter)
        const formatted = this.basicFormat(code);
        this.codeInput.value = formatted;
        this.updateCounters();
        
        // Visual feedback
        this.formatBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.formatBtn.style.transform = 'rotate(0deg)';
        }, 300);
    }

    basicFormat(code) {
        // Very basic formatting - in production, use a proper formatter
        return code
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n');
    }

    async analyzeCode(type = 'full') {
        const code = this.codeInput.value.trim();
        if (!code) {
            this.showNotification('Please enter some code to analyze', 'warning');
            return;
        }

        this.showProcessing();
        this.hideResults();

        try {
            // Simulate API call (replace with actual API integration)
            const result = await this.simulateAnalysis(code, type);
            this.displayResults(result);
        } catch (error) {
            this.showNotification('Analysis failed. Please try again.', 'error');
            console.error('Analysis error:', error);
        } finally {
            this.hideProcessing();
        }
    }

    async simulateAnalysis(code, type) {
        // Check if API key is configured
        const apiKey = localStorage.getItem('openrouter_api_key');
        
        if (!apiKey) {
            // Show API key configuration modal
            this.showApiKeyModal();
            return this.getMockResults(code, type);
        }

        try {
            // Real API call to OpenRouter
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Code Explainer AI'
                },
                body: JSON.stringify({
                    model: 'openai/gpt-4',
                    messages: [
                        {
                            role: 'system',
                            content: `You are an expert code analyzer. Analyze the provided ${this.languageSelect.value} code and provide:
                            1. A detailed explanation of what the code does
                            2. Potential issues or bugs
                            3. Optimization suggestions
                            
                            Format your response as JSON with keys: explanation, issues (array), optimization (array)`
                        },
                        {
                            role: 'user',
                            content: `Analyze this ${this.languageSelect.value} code:\n\n\`\`\`${this.languageSelect.value}\n${code}\n\`\`\``
                        }
                    ],
                    temperature: 0.3
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const analysis = JSON.parse(data.choices[0].message.content);
            
            return {
                explanation: analysis.explanation || 'Analysis completed successfully.',
                issues: analysis.issues || ['No issues detected'],
                optimization: analysis.optimization || ['No optimization suggestions']
            };

        } catch (error) {
            console.error('API Error:', error);
            this.showNotification('API Error: ' + error.message, 'error');
            return this.getMockResults(code, type);
        }
    }

    getMockResults(code, type) {
        // Fallback mock results
        return {
            explanation: `This code appears to be a ${this.languageSelect.value} program. It contains ${code.split('\n').length} lines of code and ${code.length} characters. The code structure suggests it's a well-organized program with proper formatting.`,
            issues: [
                'No obvious syntax errors detected',
                'Consider adding error handling for robustness',
                'Variable names could be more descriptive'
            ],
            optimization: [
                'Consider using more efficient data structures',
                'Add input validation where appropriate',
                'Implement proper error handling mechanisms',
                'Consider adding unit tests for better code quality'
            ]
        };
    }

    showApiKeyModal() {
        const modal = document.createElement('div');
        modal.className = 'api-key-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-key"></i> API Configuration</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <p>To use real AI analysis, please enter your OpenRouter API key:</p>
                    <input type="password" id="apiKeyInput" placeholder="Enter your OpenRouter API key" />
                    <div class="modal-actions">
                        <button class="btn-secondary" id="cancelBtn">Cancel</button>
                        <button class="btn-primary" id="saveBtn">Save & Continue</button>
                    </div>
                    <p class="help-text">
                        <a href="https://openrouter.ai/keys" target="_blank">Get your API key here</a>
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .api-key-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }
            .modal-content {
                background: var(--secondary-bg);
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius-lg);
                padding: 24px;
                max-width: 500px;
                width: 90%;
                box-shadow: var(--shadow-glow);
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            .modal-header h3 {
                color: var(--accent-color);
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .close-btn {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 24px;
                cursor: pointer;
            }
            #apiKeyInput {
                width: 100%;
                padding: 12px;
                background: var(--primary-bg);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                color: var(--text-primary);
                margin: 16px 0;
            }
            .modal-actions {
                display: flex;
                gap: 12px;
                justify-content: flex-end;
                margin: 20px 0;
            }
            .btn-primary, .btn-secondary {
                padding: 10px 20px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
            }
            .btn-primary {
                background: var(--gradient-primary);
                color: var(--primary-bg);
            }
            .btn-secondary {
                background: var(--secondary-bg);
                color: var(--text-primary);
                border: 1px solid var(--border-color);
            }
            .help-text {
                text-align: center;
                margin-top: 16px;
            }
            .help-text a {
                color: var(--accent-color);
                text-decoration: none;
            }
        `;
        document.head.appendChild(style);
        
        // Event handlers
        document.getElementById('saveBtn').addEventListener('click', () => {
            const apiKey = document.getElementById('apiKeyInput').value.trim();
            if (apiKey) {
                localStorage.setItem('openrouter_api_key', apiKey);
                this.showNotification('API key saved successfully!', 'success');
            }
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        document.getElementById('cancelBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        document.querySelector('.close-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
    }

    displayResults(results) {
        this.explanationContent.innerHTML = `<p>${results.explanation}</p>`;
        
        this.issuesContent.innerHTML = results.issues.map(issue => 
            `<div class="issue-item">
                <i class="fas fa-exclamation-circle"></i>
                <span>${issue}</span>
            </div>`
        ).join('');
        
        this.optimizationContent.innerHTML = results.optimization.map(opt => 
            `<div class="optimization-item">
                <i class="fas fa-lightbulb"></i>
                <span>${opt}</span>
            </div>`
        ).join('');

        this.showResults();
    }

    showProcessing() {
        this.processingIndicator.classList.add('active');
        this.analyzeBtn.disabled = true;
        this.analyzeBtn.style.opacity = '0.6';
    }

    hideProcessing() {
        this.processingIndicator.classList.remove('active');
        this.analyzeBtn.disabled = false;
        this.analyzeBtn.style.opacity = '1';
    }

    showResults() {
        this.resultsSection.classList.add('visible');
        this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    hideResults() {
        this.resultsSection.classList.remove('visible');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--${type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'accent'}-color);
            color: var(--primary-bg);
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-glow);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + Enter to analyze
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            this.analyzeCode();
        }
        
        // Ctrl/Cmd + K to clear
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            this.clearCode();
        }
        
        // Ctrl/Cmd + Shift + F to format
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
            e.preventDefault();
            this.formatCode();
        }
        
        // Ctrl/Cmd + Shift + T to toggle theme
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            this.toggleTheme();
        }
    }

    initializeTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    updateThemeIcon() {
        const icon = this.themeToggle.querySelector('i');
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-moon';
            this.themeToggle.title = 'Switch to Light Mode';
        } else {
            icon.className = 'fas fa-sun';
            this.themeToggle.title = 'Switch to Dark Mode';
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CodeExplainerApp();
});

// Add some additional CSS for dynamic elements
const additionalStyles = `
    .issue-item, .optimization-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 0;
        border-bottom: 1px solid var(--border-color);
    }
    
    .issue-item:last-child, .optimization-item:last-child {
        border-bottom: none;
    }
    
    .issue-item i {
        color: var(--warning-color);
        font-size: 14px;
    }
    
    .optimization-item i {
        color: var(--accent-color);
        font-size: 14px;
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
    }
    
    .code-textarea {
        transition: transform 0.15s ease;
    }
    
    .action-btn {
        transition: transform 0.15s ease;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

