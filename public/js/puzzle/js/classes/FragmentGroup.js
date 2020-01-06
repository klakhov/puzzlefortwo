class FragmentGroup {
  constructor(src, x, y, left, top) {
    this.fragments = new Set();
    this.isConnecting = false; // группа в данный момент подключает другой объект, а потому не может перемещаться.
    // В противном случае нужно чёто рассматривать а мне лень
    this.smoothing = false;

    this.listElemGroup = null;
    this.mainFragment = null; // главный фрагмент группы, нужный для вычисления расстояния до
                              // в уменьшенной группе в области меню и определения его новых координат
    this.onMenu = false;
    this.onMenuLast = false;
  }

  isHadPoint(x, y) {
    var found = false;
    var ind_ans = -1;
    this.fragments.forEach(function(fragment, ind, arr) {
      if (found)
        return;
      found = fragment.isHadPoint(x, y);
      if(found)
        ind_ans = fragment.ind;
    });
    return ind_ans
  }

  move(x, y, selected) {
    this.fragments.forEach(function(fragment, ind, arr) {
      if (fragment !== selected) {
        fragment.move(
          x - selected.x + fragment.x,
          y - selected.y + fragment.y
        )
      }
    });
    selected.move(x, y); // обрабатывается последним, т.к. в цикле используются его данные
  }

  draw(context) {
    this.fragments.forEach(function(fragment, ind, arr) {
      fragment.draw(context);
    });
  }

  smoothMove(x, y, selected, connectingFragment) {
    // connectingFragment - фрагмент, к которому я конекчусь.
    // при измнении его координат мои подстраиваются
    this.fragments.forEach(function(fragment, ind, arr) {
      if (fragment !== selected) {
        fragment.smoothMove(
          x - selected.x + fragment.x,
          y - selected.y + fragment.y,
          connectingFragment
        )
      }
    });
    selected.smoothMove(x, y, connectingFragment);
    if(connectingFragment != null) {
      // проверка для того, чтобы работать с группами один раз.
      // Если есть группа - работать, если нет, то работа внутри smoothMove
      selected.workGroups(selected, connectingFragment);
    }

  }

  changeGroup(newGroup) {
    this.fragments.forEach(function(fragment, ind, arr) {
      fragment.group = newGroup;
      newGroup.fragments.add(fragment);
    });
  }

  connectTo() {
    var minRange = -1;
    var minFragment = null;
    this.fragments.forEach(function(fragment, ind, arr) {

      // для каждого из фрагментов смотрим, можем ли мы присоединить его к другим фрагментам вне группы
      var res = fragment.connectTo(fragment.ind, false); // информация о возможности присоединения БЕЗ самого присоединения

      // сортировка по расстоянию, если есть возможность присоединить. Выбор минимального из расстояний
      if (res.res) {
        if (minRange == -1) {
          minRange = res.range;
          minFragment = fragment;
        }
        if (res.range < minRange) {
          minRange = res.range;
          minFragment = fragment;
        }
      }
    });
    if (minFragment != null)
      minFragment.connectTo(minFragment.ind, true);

  }

  editMenuCoords(fr) {
    // fr - фрагмент, который мы взяли. Относительно него будут строиться остальные
    if(this.onMenuLast == this.onMenu) {
      return;
    }
    this.onMenuLast = this.onMenu;
    if(!this.onMenu) {
      // поставить по умолчанию
      this.fragments.forEach(function(fragment, ind, arr) {
        fragment.setMenuD(false);
      });
      return;
    }

    // поставить в зависимости от главного, в меню
    this.mainFragment = fr;
    this.fragments.forEach(function(fragment, ind, arr) {
      fragment.setMenuD(true);
    });
  }
}
