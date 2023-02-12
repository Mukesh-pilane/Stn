from nltk.tokenize import sent_tokenize

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords


def clean(text):
	sample = text.split('**')
	sample.pop(0)
	clean_text = ""
	i = 0
	for t in sample:
		if i % 2 != 0:
			clean_text += str(t)
		i += 1
	return clean_text


stop_words = set(stopwords.words("english"))

def Wtokenize(text):
	words = word_tokenize(text)
	return words


def gen_freq_table(text):
	freqTable = dict()
	words = Wtokenize(text)
	
	for word in words:
		word = word.lower()
		if word in stop_words:
			continue
		if word in freqTable:
			freqTable[word] += 1
		else:
			freqTable[word] = 1
	return freqTable

def Stokenize(text):
	sentences = sent_tokenize(text)
	return sentences

def gen_rank_sentences_table(text):

	sentenceValue = dict()
	
	freqTable = gen_freq_table(text)
	
	sentences = Stokenize(text)

	for sentence in sentences:
		for word, freq in freqTable.items():
			if word in sentence.lower():
				if sentence in sentenceValue:
					sentenceValue[sentence] += freq
				else:
					sentenceValue[sentence] = freq
	return sentenceValue


def summary(text):
	sum = 0
	sentenceValue = gen_rank_sentences_table(text)
	for sentence in sentenceValue:
		sum += sentenceValue[sentence]
	avg = int(sum / len(sentenceValue))
	summary = ""
	sentences = Stokenize(text)
	for sentence in sentences:
		if (sentence in sentenceValue) and (sentenceValue[sentence] > (1.2 * avg)):
			summary += " " + sentence
	return summary

def summarize(inp_text):

	if("**" not in inp_text):
		text = inp_text
	else:
		cleaned_text = clean(inp_text)
		text = cleaned_text
	summary_text = summary(text)
	return summary_text