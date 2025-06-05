export default class TategakiTextAnimator {
    private textElement: HTMLElement;
    private originalText: string;
    private jpText: string;
    private currentText: string[];
    private targetText: string[];
    private isChangingToJp: boolean = false;
    private originalFontFamily: string;

    private static readonly JP_FONT_FAMILY: string = 'GL-NovantiquaMinamoto';
    private static readonly JP_LETTER_SPACING: string = '12px';
    private static readonly EN_LETTER_SPACING: string = '4px';

    private fadeOutDuration: number;
    private fadeInDuration: number;
    private switchDelay: number;
    private letterDelay: number;

    constructor(
        textSelector: string,
        originalText: string,
        jpText: string,
        originalFontFamily: string = 'HACKED',
        fadeOutDuration: number = 0.5,
        fadeInDuration: number = 0.5,
        switchDelay: number = 10000,
        letterDelay: number = 0.1
    ) {
        this.textElement = document.querySelector(textSelector) as HTMLElement;
        this.originalText = originalText;
        this.jpText = jpText;
        this.currentText = this.originalText.split('');
        this.targetText = this.jpText.split('');
        this.originalFontFamily = originalFontFamily;
        this.fadeOutDuration = fadeOutDuration;
        this.fadeInDuration = fadeInDuration;
        this.switchDelay = switchDelay;
        this.letterDelay = letterDelay;

        if (!this.textElement) {
            throw new Error('Text element not found');
        }
        this.updateText();
    }

    public start(): unknown | number {
        this.animateText();
        return setInterval(() => this.animateText(), this.switchDelay);
    }

    private async animateText(): Promise<void> {
        this.isChangingToJp = !this.isChangingToJp;
        this.targetText = this.isChangingToJp ? this.jpText.split('') : this.originalText.split('');

        await this.fadeOutLetters();

        this.currentText = [...this.targetText];
        this.updateText();

        await this.fadeInLetters();
    }

    private fadeOutLetters(): Promise<void> {
        return new Promise((resolve) => {
            const children = Array.from(this.textElement.children) as HTMLElement[];
            children.forEach((child, index) => {
                child.style.transition = `opacity ${this.fadeOutDuration}s ${index * this.letterDelay}s`;
                child.style.opacity = '0';
            });

            const totalDuration = children.length * this.letterDelay + this.fadeOutDuration;
            setTimeout(resolve, totalDuration * 1000);
        });
    }

    private fadeInLetters(): Promise<void> {
        return new Promise((resolve) => {
            const children = Array.from(this.textElement.children) as HTMLElement[];

            children.forEach((child) => {
                child.style.opacity = '0';
                child.style.transition = '';
            });

            void this.textElement.offsetHeight;

            children.forEach((child, index) => {
                child.style.transition = `opacity ${this.fadeInDuration}s ${index * this.letterDelay}s`;
                child.style.opacity = '1';
            });

            const totalDuration = children.length * this.letterDelay + this.fadeInDuration;
            setTimeout(resolve, totalDuration * 1000);
        });
    }

    private updateText(): void {
        const fontFamily = this.isChangingToJp ? TategakiTextAnimator.JP_FONT_FAMILY : this.originalFontFamily;
        const letterSpacing = this.isChangingToJp ? TategakiTextAnimator.JP_LETTER_SPACING : TategakiTextAnimator.EN_LETTER_SPACING;

        this.textElement.innerHTML = this.currentText.map(char =>
            `<span style="font-family: ${fontFamily}; letter-spacing: ${letterSpacing}; opacity: 0;">${char}</span>`
        ).join('');
    }
}
