export interface ISteps {
	step: number;
	setStep(arg: number): void;
}

export interface IValid {
	isAlpha: boolean;
	isCharacter: boolean;
	isNumber: boolean;
	isSize: boolean;
	isPw: boolean;
}
