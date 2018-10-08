import { ISPList } from './SkillsToPptCv';
export default class MockHttpClient {
    private static _items;
    static get(): Promise<ISPList[]>;
}
