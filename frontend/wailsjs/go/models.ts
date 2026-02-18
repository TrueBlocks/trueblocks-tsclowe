export namespace appkit {
	
	export class RangeFilter {
	    min?: number;
	    max?: number;
	
	    static createFrom(source: any = {}) {
	        return new RangeFilter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.min = source["min"];
	        this.max = source["max"];
	    }
	}
	export class SortColumn {
	    column: string;
	    direction: string;
	
	    static createFrom(source: any = {}) {
	        return new SortColumn(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.column = source["column"];
	        this.direction = source["direction"];
	    }
	}
	export class ViewSort {
	    primary: SortColumn;
	    secondary: SortColumn;
	    tertiary: SortColumn;
	    quaternary: SortColumn;
	
	    static createFrom(source: any = {}) {
	        return new ViewSort(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.primary = this.convertValues(source["primary"], SortColumn);
	        this.secondary = this.convertValues(source["secondary"], SortColumn);
	        this.tertiary = this.convertValues(source["tertiary"], SortColumn);
	        this.quaternary = this.convertValues(source["quaternary"], SortColumn);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class TableState {
	    search?: string;
	    sort?: ViewSort;
	    page?: number;
	    pageSize?: number;
	    filters?: Record<string, Array<string>>;
	    rangeFilters?: Record<string, RangeFilter>;
	    selectedIndex?: number;
	
	    static createFrom(source: any = {}) {
	        return new TableState(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.search = source["search"];
	        this.sort = this.convertValues(source["sort"], ViewSort);
	        this.page = source["page"];
	        this.pageSize = source["pageSize"];
	        this.filters = source["filters"];
	        this.rangeFilters = this.convertValues(source["rangeFilters"], RangeFilter, true);
	        this.selectedIndex = source["selectedIndex"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace db {
	
	export class Book {
	    id: number;
	    date: string;
	    title: string;
	    author: string;
	    publisher: string;
	    publisherAddress: string;
	
	    static createFrom(source: any = {}) {
	        return new Book(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.date = source["date"];
	        this.title = source["title"];
	        this.author = source["author"];
	        this.publisher = source["publisher"];
	        this.publisherAddress = source["publisherAddress"];
	    }
	}
	export class Invention {
	    id: number;
	    date: string;
	    patentNumber: string;
	    title: string;
	    inventor: string;
	    city: string;
	    state: string;
	    comments: string;
	
	    static createFrom(source: any = {}) {
	        return new Invention(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.date = source["date"];
	        this.patentNumber = source["patentNumber"];
	        this.title = source["title"];
	        this.inventor = source["inventor"];
	        this.city = source["city"];
	        this.state = source["state"];
	        this.comments = source["comments"];
	    }
	}
	export class Link {
	    id: number;
	    title: string;
	    url: string;
	    searchTerms: string;
	    isPDF: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Link(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.url = source["url"];
	        this.searchTerms = source["searchTerms"];
	        this.isPDF = source["isPDF"];
	    }
	}
	export class RealEstate {
	    id: number;
	    date: string;
	    type: string;
	    address: string;
	    fromWhom: string;
	
	    static createFrom(source: any = {}) {
	        return new RealEstate(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.date = source["date"];
	        this.type = source["type"];
	        this.address = source["address"];
	        this.fromWhom = source["fromWhom"];
	    }
	}
	export class TimelineEvent {
	    id: number;
	    date: string;
	    age: number;
	    city: string;
	    state: string;
	    event: string;
	
	    static createFrom(source: any = {}) {
	        return new TimelineEvent(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.date = source["date"];
	        this.age = source["age"];
	        this.city = source["city"];
	        this.state = source["state"];
	        this.event = source["event"];
	    }
	}

}

