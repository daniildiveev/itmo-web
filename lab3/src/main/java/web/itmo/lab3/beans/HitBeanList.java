package web.itmo.lab3.beans;

import jakarta.faces.bean.ApplicationScoped;
import jakarta.faces.bean.ManagedBean;

import java.io.Serializable;
import java.util.ArrayList;

@ManagedBean(name = "hitDataBean")
@ApplicationScoped
public class HitBeanList implements Serializable {
    private ArrayList<HitBean> hits = new ArrayList<>();

    public HitBeanList() {}

    public ArrayList<HitBean> getHits () {
        return this.hits;
    }

    public void setHits(ArrayList<HitBean> hits) {
        this.hits = hits;
    }
}
