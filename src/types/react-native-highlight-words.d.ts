declare module 'react-native-highlight-words' {
    import { ComponentType } from 'react';
    import { TextProps, TextStyle } from 'react-native';
  
    interface HighlighterProps extends TextProps {
      autoEscape?: boolean;
      highlightStyle?: TextStyle;
      searchWords: string[];
      textToHighlight: string;
    }
  
    const Highlighter: ComponentType<HighlighterProps>;
    export default Highlighter;
  }