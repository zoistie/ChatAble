
import os
from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, MessagesState, StateGraph
from langchain_core.messages import HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_tavily import TavilySearch
from langgraph.prebuilt import create_react_agent

#Get API Keys from .env file
load_dotenv()
os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY')
os.environ["TAVILY_API_KEY"] = os.getenv("TAVILY_API_KEY")



#Initialize Model
def Initialize_Model():
    model = init_chat_model("gpt-4o", model_provider="openai")
    tavily_search_tool = TavilySearch(
    max_results=5,
    topic="general",)
    prompt_template = ChatPromptTemplate.from_messages(
         [( "system",
             """You are ChatAble, the chat bot for the company Able. You are here to assist people with their needs and questions about Able.
             Their website is https://able.co/, Their crunchbase is https://www.crunchbase.com/organization/able-2/org_similarity_overview,
             and their Linkedin is https://www.linkedin.com/company/able-co, try to use these to answer any questions people have about Able.
              Also try to not include any links in your messages, if someone asks an irrelevant question tell them you can only answer things about Able.
              DO NOT MAKE UP ANYTHING WHEN YOU TALK ABOUT ABLE, MAKE SURE YOU VERIFY ANY INFORMATION YOU HAVE WITH YOUR SEARCH TOOL
              """),
             MessagesPlaceholder(variable_name="messages"),
         ]
     )
    memory = MemorySaver()
    agent = create_react_agent(model, [tavily_search_tool], checkpointer= memory, prompt = prompt_template)


    return agent

#Function Call to chat with the model
def Chat_Model(Chatbot,prompt):
    config = {"configurable": {"thread_id": "abc123"}}
    input_messages = [HumanMessage(prompt)]
    output = Chatbot.invoke({"messages": input_messages}, config)
    return output["messages"][-1].content




