import Chat from "../models/Chat.js"


export const createChat = async (req, res) => {
    try {
        const userId = req.user._id

        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            userName: req.user.name
        }

        await Chat.create(chatData)
        return res.json({ success: true, message: "chat created" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const getChats = async (req, res) => {
    try {
        const chats = await Chat.find({ userId: req.user._id }).sort({ createdAt: -1 });
        return res.json({ success: true, chats });
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId } = req.body;

        await Chat.deleteOne({ _id: chatId, userId })
        return res.json({ success: true, message: "chat deleted" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}