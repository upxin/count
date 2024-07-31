import { defineComponent } from 'vue';
import Draggable from 'vuedraggable';

function cloneDeep(data: any) {
  return JSON.parse(JSON.stringify(data));
}

export default defineComponent({
  name: 'NestedItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const cloneItem = (item: any) => {
      return cloneDeep(item);
    };

    const a = 123;

    return () => (
      <div class="border-1px border-amber border-solid p-20px">
        <n-button class="">{props.item.name ?? '你好'}</n-button>
        {props.item.children && (
          <Draggable
            list={props.item.children}
            group="people"
            itemKey="name"
            clone={cloneItem}
            class="w-full h-80px"
          >
            {props.item.name}
          </Draggable>
        )}
      </div>
    );
  },
});
