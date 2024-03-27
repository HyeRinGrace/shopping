let tokenResetTimer: any;

export function setTokenResetTimer(timer: any) {
	tokenResetTimer = timer;
}

export function clearTokenResetTimer() {
	clearTimeout(tokenResetTimer);
}
