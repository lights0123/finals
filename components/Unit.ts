export interface Topic {
	name: string;
	id: string;
}

export interface Unit {
	num: number;
	name: string;
	topics: Topic[];
	enabledTopics: string[];
}
