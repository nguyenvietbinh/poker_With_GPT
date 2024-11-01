import type { TaskType } from "$api/be/databases/types";
import { askChatAPIFull } from "$api/oai/chat/chat-client";
import type { askChatGrammarDetail } from "$lib/feedback/types";
import type { ModelConfig, RequestChatResponse } from "$lib/types";

const chat4omini: ModelConfig = {
  name: 'gpt-4o-mini',
  maxTokens: 800,
  temperature: 0.05
};


export async function askChatListGrammarScoreV2(questions_answers: { question: string, user_answer: string }[], part: TaskType = "PART 1") {
  const unfoldedQA = questions_answers.map(({ question, user_answer }) => {
    return The question: "${question}",\nMy answer: "${user_answer}"\n;
  }).join('\n');

  const prompt = `You are an IELTS speaking expert evaluating answers for Speaking ${part}.\n
Here is the standard for grammatical range and accuracy:\n
- Band 4.5: Basic sentence forms with some correct simple sentences; frequent errors may cause misunderstandings.\
- Band 5.5: Reasonable accuracy in basic sentences; limited use of complex structures with errors causing comprehension problems.\
- Band 6.5: Mix of simple and complex structures with limited flexibility; errors in complex structures rarely impede understanding.\
- Band 7.0: Flexible use of complex structures; frequent error-free sentences with some persistent grammatical mistakes.\
- Band 8.0: Wide range of structures used flexibly; mostly error-free with occasional basic errors.

Take the answer length in evaluating band score. Short answers should have lower band scores\n

"""
${unfoldedQA}
"""

Sample Error Correction:
Errors Start
have been always reading -> have always been reading: Lỗi Thì. "always" đứng trước động từ chính trong thì hiện tại hoàn thành tiếp diễn.
which makes me realize -> which made me realize: Lỗi Thì. Cũng cần sử dụng thì quá khứ để phù hợp với ngữ cảnh.
I am probably already made -> I have probably already made: Lỗi Thì. "am" không phù hợp trong ngữ cảnh này, cần dùng thì hiện tại hoàn thành.
decent cooker -> decent cook: Lỗi Loại Từ. "cook" để chỉ người nấu ăn.
It symbolizes the heaven and the earth -> It symbolizes heaven and earth: Lỗi Giới Từ và Mạo Từ. Cần bỏ "the" trước "heaven" và "earth" vì đây là khái niệm chung.
...
Errors End

Provide the grammatical range and accuracy score and feedback in the format:
- Band: score (score .5 if the user answer level is between two bands)  

Errors Start
Original Error Phrase (Less than 4 words) -> Correct phrase: Lỗi Thì/Lỗi Cấu Trúc/Lỗi Loại Từ/Lỗi Giới Từ và Mạo Từ. Giải thích lỗi trong tiếng việt.
Errors End


Focus specifically on grammar in spoken English. Punctuation, vocabulary and other errors should not reduce this score.
Only return grammar errors that match one of Lỗi Thì/Lỗi Cấu Trúc/Lỗi Loại Từ/Lỗi Giới Từ và Mạo Từ. 
Đừng "cải thiện" gì cả, chỉ báo lỗi.
`

  const request: RequestChatResponse = {
    config: chat4omini,
    systemPrompt: prompt,
    messages: [],
  };

  const res = await askChatAPIFull(request);
  if (!res || !res.length) {
    return null;
  } else {
    return parseGrammarResponse(res);
  }
}

export function parseGrammarResponse(response: string): askChatGrammarDetail {
  // Extracting the error message first
  const errorStartIndex = response.indexOf("Errors Start");
  const errorEndIndex = response.indexOf("Errors End");
  let errorMessage: string | null = null;

  if (errorStartIndex !== -1 && errorEndIndex !== -1) {
    errorMessage = response.substring(
      errorStartIndex + "Errors Start".length,
      errorEndIndex
    ).trim();
  }

  const bandMatch = response.match(/Band:\s*(\d+(\.\d+)?)/);
  const band = bandMatch ? bandMatch[1] : "0";


  return { score: parseFloat(band), message: errorMessage || "", chat: response };
}
14:15
Bắc
Nguyễn Việt Bắc
  const unfoldedQA = questions_answers.map(({ question, user_answer }) => {
    return The question: "${question}",\nThe answer: "${user_answer}"\n;
  }).join('\n');

  const prompt = `You are an IELTS speaking expert evaluating answers for Speaking ${part}.\n
  Here is the lexical resource standard:\n

Band 4.5: Very limited meaning conveyance OR serious word choice issues that may impede understanding.
Example
question: do you prefer to take pictures with your phone or a camera?
answer: I like to learn, I like to learn it, but I like to learn important than photography. Learn something important than photography.

Band 5.0: Meaning is not clear OR with lengthy expressions to describe simple ideas. A lots of vocab errors
Example
question: Do you always bring a lot of keys with you?
answer: I always bring a lot of keys to my body because I just use a motorbike and I just use one key and second key for the lock in my gate.

question: Do people have enough time for themselves?
answer: I think no, because nowadays social media is very popular and when you take your phone, you don't know how to waste your time. Sometimes you can't very easily spend your two hours. For this time, you can do more good things for your life or you can read, you can go with your friends, you can take care of your parents, for example. I think social media is cutting our time.

Band 5.5: Meaning is generally understandable. Some vocab errors
Example

question: Do you think it's common for people who grew up in the countryside to move to bigger cities?
answer: I think so. Mostly students are important for studying in a very good environment. As the countryside did not develop like cities, like libraries or any studying places, I think students have to move to a place to study in a good environment, and maybe they can concentrate to study easily.

question: Do you often read books?
answer: Yes, I love book. I usually read Harry Potter novels because it is so Stimulates my creativity and or so security So or so the movie is make of the The book is make of the movie so it is interesting compared to the book

Band 6.0: Meaning is clear. Some vocab errors occur.
Example

The question: What kinds of things would make you feel bored?
The answer: Well, I would say the assignment, which is really hard or very easy, sometimes makes me lazy, because it's really easy and I skip them, or it's really difficult to me, I can't give up it.

The question: Do you often feel bored?
The answer: Yes, of course, every once in a while, when I have no plans for my day or for my week, I usually lazing on my smartphone and scrolling some news feed on Instagram. Although I know it's really helpful to me, but I think I'll edit this.

Band 6.5: Effective use of simple vocabulary OR Attempts less common vocabulary. Some inappropriacies occur.
Example
The question: Do you enjoy watching sports?
The answer: I used to watch sports when I was a kid. I used to watch it with my dad, so I kind of like enjoy it. But right now, when I'm growing up, I have not been fond of it longer because I have more things to do and more things to watch in my phone, in my laptop. I enjoy watching game shows or maybe film, social media, rather than sports.

The question: Do you think there is too much sport on television in your country?
The answer: No, I don't think like that because from my perspective in the summer in my country have a lot of sports like football and tennis. My father and my younger brother often watch this sport but in the winter I rarely see any sport like that in television. Maybe this game show or this program is not enough attractive and I just watched some game shows about dancing so I don't think sports on television in my country have too much.

Band 7.0: Uses common collocations OR use simple but topic specific vocabulary. though some inaccuracies occur. The answer should not be too short.
Example

question: Do you live in a house or an apartment?
answer: I've been living in an apartment for about six years now. I used to live in a nice big house when I was a kid, but since my mom gave birth to my twin brothers, we moved to a more secure place.

question: Do you plan to live in that house for a long time?
answer: Oh well, that's not in my plan, since I'm a senior at high school, so I'm attending to college soon, which means I will definitely move out.

Band 7.5: Have paraphrases OR attempts to use topic specific/less common collocation, though some inaccuracies occur.
Example
question: Do you think older and younger generations prefer different types of music?
answer: Well, this question stunned me a bit because I have never asked what my parents taste in music are. But on some sneaky-peaky situation, I heard that my parents also love Linkin Park and Magnify Hits which is also my all-time favorite band. So I guess that they are not very different between our generation.

question: What did you study in your university?
answer: My major is psychology, and I majored in psychology because I wanted to be a profiler before because I'm a big fan of Sherlock Holmes, but then it was different from what I thought, so I regret it.

question: Are there any shops near your house?
answer: Yes, there are several shops near my house. There are small convenience stores just around the corner where I often go to buy snacks and drinks. It's very handy when I need something quickly.

Band 8.0: Paraphrases the question using different words OR demonstrates the use of less common collocations.
Example
The question: Is there any music concert that you want to go to?
The answer: Yes, I am eagerly anticipating the upcoming concerts of the Ronaldo Jazz Ensemble. Their live performances are said to be breathtaking and I've been following their work for years.

question: What kind of things do you write during a typical day?
answer: During a typical day, I find myself jotting down assignments in notes for school, which keeps me all night. I also enjoy keeping a diary where I can spend my feelings and reflect on my daily adventures. It's a great way for me to stay in touch with my thoughts and give me that much needed time for self-reflection.

Band 8.5: Uses advanced collocations effectively OR employs advanced vocabulary with precise meaning.\n
Example

question: Are there diffrent type of rainy season in your country?
answer: Honestly, I'm no meteorologist, so I wouldn't know the answer to this question, but I'll venture a guess that perhaps if we were to classify them, it would be based on criteria such as the duration and intensity of the rain, and perhaps how often it rains.

Band 9.0: As 8.5 and speak at length or more collocations.
The question: What kind of weather do you like the most?
The answer: I think I prefer the rainy season the most. There's something about the cool, damp air and those gentle patters of rain that just put me at ease. I feel like the perfect time to cozy up with a book or a cup of tea, letting the sound of the rain wash my worries away.

"""
${unfoldedQA}
"""

Recommend some topic specific vocabulary and idiomatic expressions.
Recommend less if the answer is already good.
Do not add any extra comment.
Focus specifically on vocabulary in spoken English. Grammar and other errors should not reduce this score.

Sample Recommend:
Recommend Start
very happy -> over the moon: Thành Ngữ. "over the moon" giúp câu văn trở nên sinh động hơn và thể hiện trình độ tiếng Anh cao hơn.
dumb -> misguided: Từ Vựng Phù Hợp. "misguided" tinh tế hơn, cho thấy quyết định bị sai lầm do thông tin sai.
...
Recommend End

Focus specifically on vocabulary in spoken English. Grammar and other errors should not reduce this score.

Provide the lexical resource score and feedback in the format:
Band: score 

Recommend Start
Original expressions (less than 4 words) -> Improved Idiomatic Expressions: Thành Ngữ/Từ Vựng Phù Hợp/Diễn Đạt Lại. A brief Vietnamese explanation.
Recommend End
