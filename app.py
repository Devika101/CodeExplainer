# code-explainer-bot/app.py
import streamlit as st
import os
from langchain_openai import ChatOpenAI

# ✅ Streamlit page setup
st.set_page_config(page_title="Code Explainer", layout="wide")
st.title("💡 Code Explainer & Debugger — Powered by OpenRouter")

# ✅ Set default OpenRouter-compatible model (you can change this)
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "openrouter/openai/gpt-4o-mini")

# ✅ Ensure environment variables are set for OpenRouter
# You can also set these permanently in your system environment or .env file
os.environ["OPENAI_BASE_URL"] = os.environ.get("OPENAI_BASE_URL", "https://openrouter.ai/api/v1")
if "OPENAI_API_KEY" not in os.environ:
    st.warning("⚠️ Missing OPENAI_API_KEY. Please set your OpenRouter API key.")
else:
    st.success(f"✅ Using model: {OPENAI_MODEL}")

# ✅ Cache model to prevent reloading each time
@st.cache_resource
def load_llm():
    return ChatOpenAI(model=OPENAI_MODEL, temperature=0.2)

llm = load_llm()

# ✅ Main app UI
code = st.text_area("🧩 Paste your code below:", height=300, placeholder="Paste your Python, Java, or JS code here...")

if st.button("Explain Code 💬") and code.strip():
    with st.spinner("Analyzing code... please wait ⏳"):
        prompt = f"""
        You are a professional software engineer. 
        Explain what this code does step-by-step, identify possible bugs, 
        and suggest improvements (performance, readability, and security).

        CODE:
        {code}
        """
        try:
            response = llm.invoke(prompt)
            output = getattr(response, "content", str(response))
            st.markdown("### 🧠 Explanation & Suggestions")
            st.write(output)
        except Exception as e:
            st.error(f"❌ Request failed: {e}")
            st.info(
                "💡 Tip: Make sure your OpenRouter environment is set correctly.\n\n"
                "Example setup in terminal:\n"
                "export OPENAI_API_KEY='your-openrouter-api-key'\n"
                "export OPENAI_BASE_URL='https://openrouter.ai/api/v1'\n"
                "export OPENAI_MODEL='openrouter/openai/gpt-4o-mini'"
            )

